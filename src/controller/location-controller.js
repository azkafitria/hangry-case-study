const getLocationController = async (req, res, next) => {
  const { latitude, longitude } = req.ipInfo.loc || {
    latitude: 0,
    longitude: 0,
  };
  const clientIp = req.ipInfo.ip;

  const response = {
    latitude: latitude,
    longitude: longitude,
    clientIp: clientIp,
    loc: req.ipInfo.loc,
    ip: req.ipInfo.ip,
    info: req.ipInfo,
  };

  res.json(response);
};

export { getLocationController };
