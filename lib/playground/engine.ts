import { Instrument, Holding, PlaygroundState, HistoryEntry } from '../types';

// Default instruments for the playground
export const defaultInstruments: Instrument[] = [
  {
    id: 'large_cap',
    name: 'Large Cap Fund',
    description: 'Invests in top 100 companies by market cap. Lower risk, steady returns.',
    riskLevel: 'low',
    currentPrice: 100,
    priceHistory: [95, 97, 99, 100],
  },
  {
    id: 'balanced',
    name: 'Balanced Mix Fund',
    description: 'Mix of equity and debt for moderate growth. Medium risk.',
    riskLevel: 'medium',
    currentPrice: 120,
    priceHistory: [110, 115, 118, 120],
  },
  {
    id: 'index',
    name: 'Index Basket',
    description: 'Tracks the market index. Low cost, diversified exposure.',
    riskLevel: 'medium',
    currentPrice: 150,
    priceHistory: [140, 145, 148, 150],
  },
  {
    id: 'debt',
    name: 'Debt Saver Fund',
    description: 'Invests in government and corporate bonds. Very low risk.',
    riskLevel: 'low',
    currentPrice: 50,
    priceHistory: [48, 49, 49.5, 50],
  },
];

// Initial playground state
export function createInitialPlaygroundState(): PlaygroundState {
  return {
    cashBalance: 100000,
    holdings: [],
    history: [
      {
        step: 0,
        portfolioValue: 100000,
        timestamp: new Date(),
      },
    ],
    marketMovePercent: 0,
    instruments: defaultInstruments.map(i => ({ ...i })),
    totalValue: 100000,
    simTradesCount: 0,
  };
}

// Calculate total invested value
export function calculateInvestedValue(holdings: Holding[]): number {
  return holdings.reduce((sum, h) => sum + h.units * h.currentPrice, 0);
}

// Calculate total portfolio value
export function calculateTotalValue(state: PlaygroundState): number {
  const investedValue = calculateInvestedValue(state.holdings);
  return state.cashBalance + investedValue;
}

// Calculate gain/loss percentage
export function calculateGainLoss(state: PlaygroundState): number {
  const startValue = 100000; // Initial investment
  const currentValue = calculateTotalValue(state);
  return ((currentValue - startValue) / startValue) * 100;
}

// Buy instrument
export function buyInstrument(
  state: PlaygroundState,
  instrumentId: string,
  amount: number
): PlaygroundState | { error: string } {
  if (amount <= 0) {
    return { error: 'Amount must be positive' };
  }

  if (amount > state.cashBalance) {
    return { error: 'Insufficient funds' };
  }

  const instrument = state.instruments.find(i => i.id === instrumentId);
  if (!instrument) {
    return { error: 'Instrument not found' };
  }

  const units = amount / instrument.currentPrice;
  const existingHolding = state.holdings.find(h => h.instrumentId === instrumentId);

  let newHoldings: Holding[];
  if (existingHolding) {
    // Update existing holding with weighted average price
    const totalUnits = existingHolding.units + units;
    const totalCost = existingHolding.units * existingHolding.avgBuyPrice + amount;
    const newAvgPrice = totalCost / totalUnits;

    newHoldings = state.holdings.map(h =>
      h.instrumentId === instrumentId
        ? {
            ...h,
            units: totalUnits,
            avgBuyPrice: newAvgPrice,
            currentPrice: instrument.currentPrice,
          }
        : h
    );
  } else {
    // Create new holding
    newHoldings = [
      ...state.holdings,
      {
        id: `${instrumentId}_${Date.now()}`,
        instrumentId,
        name: instrument.name,
        units,
        avgBuyPrice: instrument.currentPrice,
        currentPrice: instrument.currentPrice,
      },
    ];
  }

  const newState: PlaygroundState = {
    ...state,
    cashBalance: state.cashBalance - amount,
    holdings: newHoldings,
    simTradesCount: state.simTradesCount + 1,
  };

  // Update total value
  newState.totalValue = calculateTotalValue(newState);

  // Add to history
  newState.history = [
    ...state.history,
    {
      step: state.history.length,
      portfolioValue: newState.totalValue,
      timestamp: new Date(),
    },
  ];

  return newState;
}

// Sell instrument
export function sellInstrument(
  state: PlaygroundState,
  instrumentId: string,
  amount: number
): PlaygroundState | { error: string } {
  if (amount <= 0) {
    return { error: 'Amount must be positive' };
  }

  const holding = state.holdings.find(h => h.instrumentId === instrumentId);
  if (!holding) {
    return { error: 'No holding found' };
  }

  const instrument = state.instruments.find(i => i.id === instrumentId);
  if (!instrument) {
    return { error: 'Instrument not found' };
  }

  const unitsToSell = amount / instrument.currentPrice;
  if (unitsToSell > holding.units) {
    return { error: 'Insufficient units to sell' };
  }

  const remainingUnits = holding.units - unitsToSell;
  let newHoldings: Holding[];

  if (remainingUnits < 0.001) {
    // Remove holding if remaining units are negligible
    newHoldings = state.holdings.filter(h => h.instrumentId !== instrumentId);
  } else {
    newHoldings = state.holdings.map(h =>
      h.instrumentId === instrumentId
        ? {
            ...h,
            units: remainingUnits,
            currentPrice: instrument.currentPrice,
          }
        : h
    );
  }

  const newState: PlaygroundState = {
    ...state,
    cashBalance: state.cashBalance + amount,
    holdings: newHoldings,
    simTradesCount: state.simTradesCount + 1,
  };

  // Update total value
  newState.totalValue = calculateTotalValue(newState);

  // Add to history
  newState.history = [
    ...state.history,
    {
      step: state.history.length,
      portfolioValue: newState.totalValue,
      timestamp: new Date(),
    },
  ];

  return newState;
}

// Simulate market move
export function simulateMarketMove(
  state: PlaygroundState,
  percentChange: number
): PlaygroundState {
  const multiplier = 1 + percentChange / 100;

  // Update all instrument prices with some variation
  const newInstruments = state.instruments.map(instrument => {
    // Add some randomness to each instrument (±2% variation from the general move)
    const variation = (Math.random() - 0.5) * 0.04;
    const instrumentMultiplier = multiplier + variation;
    
    // Risk-based amplification: higher risk = more movement
    let amplification = 1;
    if (instrument.riskLevel === 'medium') amplification = 1.2;
    if (instrument.riskLevel === 'high') amplification = 1.5;
    
    const effectiveMultiplier = 1 + (instrumentMultiplier - 1) * amplification;
    const newPrice = Math.max(1, instrument.currentPrice * effectiveMultiplier);

    return {
      ...instrument,
      currentPrice: Math.round(newPrice * 100) / 100,
      priceHistory: [...instrument.priceHistory.slice(-9), newPrice],
    };
  });

  // Update holdings with new prices
  const newHoldings = state.holdings.map(holding => {
    const instrument = newInstruments.find(i => i.id === holding.instrumentId);
    return {
      ...holding,
      currentPrice: instrument?.currentPrice || holding.currentPrice,
    };
  });

  const newState: PlaygroundState = {
    ...state,
    instruments: newInstruments,
    holdings: newHoldings,
    marketMovePercent: state.marketMovePercent + percentChange,
  };

  // Update total value
  newState.totalValue = calculateTotalValue(newState);

  // Add to history
  newState.history = [
    ...state.history,
    {
      step: state.history.length,
      portfolioValue: newState.totalValue,
      timestamp: new Date(),
    },
  ];

  return newState;
}

// Get instrument by ID
export function getInstrument(state: PlaygroundState, instrumentId: string): Instrument | undefined {
  return state.instruments.find(i => i.id === instrumentId);
}

// Check if portfolio is diversified (at least 3 different instruments)
export function isDiversified(state: PlaygroundState): boolean {
  return state.holdings.length >= 3;
}

// Get portfolio composition
export function getPortfolioComposition(state: PlaygroundState): { name: string; value: number; percentage: number }[] {
  const investedValue = calculateInvestedValue(state.holdings);
  
  if (investedValue === 0) {
    return [{ name: 'Cash', value: state.cashBalance, percentage: 100 }];
  }

  const composition = state.holdings.map(h => ({
    name: h.name,
    value: h.units * h.currentPrice,
    percentage: (h.units * h.currentPrice / state.totalValue) * 100,
  }));

  composition.push({
    name: 'Cash',
    value: state.cashBalance,
    percentage: (state.cashBalance / state.totalValue) * 100,
  });

  return composition;
}

