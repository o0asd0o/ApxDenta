import type { GetAllTreatmentsParams } from '../get-all-treatments';

export const getAllTreatments = ({ ctx, input }: GetAllTreatmentsParams) => {
  return ctx.db.selectFrom('Treatment').selectAll().execute();
};
