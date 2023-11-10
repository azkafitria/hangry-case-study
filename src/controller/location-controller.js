import { getLocationService } from "../service/location-service.js";

const getLocationController = async (req, res, next) => {
  try {
    const result = await getLocationService(req.ipInfo.loc, req.ipInfo.ip);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export { getLocationController };
