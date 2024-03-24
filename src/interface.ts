export type EnrichedAllocation = {
    requested: number;
    received: number;
    symbol: string;
}

export type Machine = {
    name: string;
    symbols: Locate;
    allocations?: Locate;
}

export type Locate = { [key: string]: number }

export type Locates = { [key: string]: Locate }

