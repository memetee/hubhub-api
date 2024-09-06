export interface MomentCreate {
  content: string;
}
export interface AlertContent {
  momentUpdate: {
    success: string;
    error: string;
  };
  momentDelete: {
    success: string;
    error: string;
  };
  momentCreate: {
    success: string;
    error: string;
  };
  commentUpdate: {
    success: string;
    error: string;
  };
  commentDelete: {
    success: string;
    error: string;
  };
  commentCreate: {
    success: string;
    error: string;
  };
  replayComment: {
    success: string;
    error: string;
  };
  labelCreate: {
    success: string;
    error: string;
  };
}
