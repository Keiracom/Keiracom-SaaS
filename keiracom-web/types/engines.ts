export interface AuthorityGap {
    cluster_name: string;
    gap_score: number; // 0-100
    opportunity_volume: number; // Search volume representing potential traffic
}

export interface CannibalizationConflict {
    term: string;
    winner_url: string;
    loser_url: string;
    status: 'resolved' | 'pending';
    redirect_rule?: string;
    rationale?: string;
}

export interface HeistOpportunity {
    term: string;
    target_url: string;
    competitor_url: string;
    status: 'identified' | 'stolen';
    new_html?: string;
}

export interface EngineMetric {
    engine_id: number;
    name: string;
    status: 'active' | 'idle' | 'optimization_needed';
    last_run: string; // ISO date
    actions_taken: number;
}
