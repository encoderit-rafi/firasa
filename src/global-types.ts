export type PersonalityType = {
  name: string;
  value: number | string;
  type: "moderate" | "high" | "low";
};

export type PersonalityScores = PersonalityType[];

export type PredictionResponse = {
  success: boolean;
  predictions: PersonalityTraits;
  interpretations: TraitInterpretations;
  summary: ProfileSummary;
  insights: PersonalityInsights;
  relationship_metrics: RelationshipMetrics;
  work_metrics: WorkMetrics;
  creativity_metrics: CreativityMetrics;
  stress_metrics: StressMetrics;
  openness_metrics: OpennessMetrics;
  learning_metrics: LearningMetrics;
  audio_metrics: AudioMetrics; // Video only
  transcript: string; // Video only
  report_error: string;
  metadata: PredictionMetadata;
  timestamp: string; // ISO 8601
};
export type PersonalityTraits = {
  openness: number; // 0.0 to 1.0
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
};
export type TraitInterpretations = {
  openness: TraitInterpretation;
  conscientiousness: TraitInterpretation;
  extraversion: TraitInterpretation;
  agreeableness: TraitInterpretation;
  neuroticism: TraitInterpretation;
};

export type TraitInterpretation = {
  raw_score: number; // 0.0 to 1.0
  t_score: number; // ~20-80, mean=50, std=10
  percentile: number; // 0-100
  category: string; // "Very Low" | "Low" | "Average" | "High" | "Very High"
  label: string; // e.g., "Highly curious and imaginative"
  interpretation: string; // Detailed narrative (100+ words)
};
export type ProfileSummary = {
  category_distribution: {
    "Very Low": number;
    Low: number;
    Average: number;
    High: number;
    "Very High": number;
  };
  dominant_traits: string[]; // Traits with T ≥ 60
  subdued_traits: string[]; // Traits with T ≤ 40
  mean_t_score: number; // Average T-score
  total_traits: number; // Always 5
};
export type PersonalityInsights = {
  title: string; // e.g., "The Creative Strategist"
  tags: TraitTag[]; // 3 trait tags
  description: string; // 1-2 sentence summary
  quote: string; // Personal motto (10-15 words)
  story: string; // Narrative (100-150 words)
  story_traits: TraitTag[]; // 6-8 "You are..." descriptors
};

export type TraitTag = {
  emoji: string; // e.g., ":dart:"
  label: string; // e.g., "Purpose-driven"
};
export type RelationshipMetrics = {
  metrics: {
    trust_signaling: DerivedMetric;
    social_openness: DerivedMetric;
    empathic_disposition: DerivedMetric;
    conflict_avoidance: DerivedMetric;
    harmony_seeking: DerivedMetric;
    anxiety_avoidance: DerivedMetric;
  };
  coach_recommendation: string; // 50-100 words
  actionable_steps: ActionableStep[]; // 6 steps
  snapshot_insight?: string;
  behavioral_patterns?: BehavioralPattern[];
  how_others_experience?: string;
  strength?: StrengthTradeoff;
  tradeoff?: StrengthTradeoff;
  growth_lever?: string;
  suitable_for?: string[];
};
export type WorkMetrics = {
  metrics: {
    persistence: DerivedMetric;
    focus_attention: DerivedMetric;
    structure_preference: DerivedMetric;
    risk_aversion: DerivedMetric;
  };
  coach_recommendation: string;
  actionable_steps: ActionableStep[];

  // Accordion fields (same as RelationshipMetrics)
  snapshot_insight?: string;
  behavioral_patterns?: BehavioralPattern[];
  how_others_experience?: string;
  strength?: StrengthTradeoff;
  tradeoff?: StrengthTradeoff;
  growth_lever?: string;
  suitable_for?: string[];
};
export type CreativityMetrics = {
  metrics: {
    ideation_power: DerivedMetric;
    openness_to_novelty: DerivedMetric;
    originality_index: DerivedMetric;
    attention_to_detail_creative: DerivedMetric;
  };
  coach_recommendation: string;
  actionable_steps: ActionableStep[];

  // Accordion fields (same structure)
  snapshot_insight?: string;
  behavioral_patterns?: BehavioralPattern[];
  how_others_experience?: string;
  strength?: StrengthTradeoff;
  tradeoff?: StrengthTradeoff;
  growth_lever?: string;
  suitable_for?: string[];
};
export type StressMetrics = {
  metrics: {
    stress_indicators: DerivedMetric;
    emotional_regulation: DerivedMetric;
    resilience_score: DerivedMetric;
  };
  coach_recommendation: string;
  actionable_steps: ActionableStep[];

  // Accordion fields (same structure)
  snapshot_insight?: string;
  behavioral_patterns?: BehavioralPattern[];
  how_others_experience?: string;
  strength?: StrengthTradeoff;
  tradeoff?: StrengthTradeoff;
  growth_lever?: string;
  suitable_for?: string[];
};
export type OpennessMetrics = {
  metrics: {
    openness_to_experience: DerivedMetric;
    novelty_seeking: DerivedMetric;
    risk_tolerance_adventure: DerivedMetric;
    planning_preference: DerivedMetric;
  };
  coach_recommendation: string;
  actionable_steps: ActionableStep[];
  snapshot_insight?: string;
  behavioral_patterns?: BehavioralPattern[];
  how_others_experience?: string;
  strength?: StrengthTradeoff;
  tradeoff?: StrengthTradeoff;
  growth_lever?: string;
  suitable_for?: string[];
};
export type LearningMetrics = {
  metrics: {
    intellectual_curiosity: DerivedMetric;
    reflective_tendency: DerivedMetric;
    structured_learning_preference: DerivedMetric;
    adaptability_index: DerivedMetric;
  };
  coach_recommendation: string;
  actionable_steps: ActionableStep[];
  snapshot_insight?: string;
  behavioral_patterns?: BehavioralPattern[];
  how_others_experience?: string;
  strength?: StrengthTradeoff;
  tradeoff?: StrengthTradeoff;
  growth_lever?: string;
  suitable_for?: string[];
};
export type AudioMetrics = {
  indicators: {
    vocal_extraversion: VocalIndicator;
    vocal_stability: VocalIndicator;
    vocal_confidence: VocalIndicator;
    vocal_warmth: VocalIndicator;
  };
  interpretations: {
    pitch: string;
    expressiveness: string;
    volume: string;
    pace: string;
    brightness: string;
    stability: string;
  };
  coach_recommendation: string;
  actionable_steps: ActionableStep[];
};

export type VocalIndicator = {
  score: number; // 0-100
  level: string; // "Low" | "Moderate" | "High"
  signals: string[]; // e.g., ["projects voice confidently", "speaks rapidly"]
};
export type TLevel = "Low" | "Moderate" | "High";
export type DerivedMetric = {
  score: number; // 0-100 percentage
  // level: string; // "Low" | "Moderate" | "High"
  level: TLevel;
  description: string; // Personalized description based on score
};
// *Level Thresholds:*
// | Level | Score Range |
// |-------|-------------|
// | Low | 0-35 |
// | Moderate | 36-64 |
// | High | 65-100 |
export type ActionableStep = {
  emoji: string; // e.g., ":dart:"
  text: string; // e.g., "Set small daily goals"
};
export type BehavioralPattern = {
  title: string; // e.g., "Active Listener"
  description: string; // e.g., "You naturally pick up on emotional cues..."
};
export type StrengthTradeoff = {
  title: string; // e.g., "Empathy Champion"
  description: string; // e.g., "Your ability to understand others..."
};

export type PredictionMetadata = {
  norms: {
    stds: BigFiveTraits;
    means: BigFiveTraits;
    source: string;
    version: string;
    computed_at: string;
  };

  cutoffs: {
    avg_hi: number;
    low_hi: number;
    high_hi: number;
    very_low: number;
    very_high: number;
  };

  file_path: string;
  streaming: boolean;

  multimodal: {
    has_assessment: boolean;
    has_transcript: boolean;
    frames_analyzed: number;
    transcript_length: number;
    questions_answered: number;
  };

  prediction: {
    model: string;
    device: string;
    backbone: string;
    tta_used: boolean;
    image_size: number;
    num_frames_used: number;
    aggregation_method: string;
    num_frames_extracted: number;
    selected_frame_indices: number[];
    per_trait_std_all_frames: BigFiveTraits;
  };

  preprocessing: {
    fps: number;
    path: string;
    width: number;
    height: number;
    method: string;
    face_bbox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    file_path: string;
    file_type: string;
    frame_count: number;
    face_detected: boolean;
    original_size: [number, number];
    processed_size: [number, number];
    duration_seconds: number;
    face_image_base64: string;
    face_detection_rate: number;
    faces_detected_count: number;
    num_frames_extracted: number;
    num_frames_processed: number;
    num_frames_requested: number;
    preprocessing_method: string;
    skip_no_face_enabled: boolean;
    frames_skipped_no_face: number;
  };
};

export type BigFiveTraits = {
  openness: number;
  neuroticism: number;
  extraversion: number;
  agreeableness: number;
  conscientiousness: number;
};
export type TReportData = {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    is_admin: number;
  };
  analysis_id: string;
  name: string;
  share_token: null | string;
  full_result: PredictionResponse;
};
export type TBigFiveTraits = {
  id: string;
  share_token: string | null;
  face_image_base64: string;
  insights: Pick<PersonalityInsights, "title" | "description">;
  predictions: PersonalityTraits;
};
export type TUniqueStoryTraits = {
  id: string;
  share_token: string | null;
  insights: Pick<PersonalityInsights, "quote" | "story" | "story_traits">;
};
