const getLocationService = (loc, ip) => {
  const { latitude, longitude } = loc || {
    latitude: 0,
    longitude: 0,
  };
  const clientIp = ip;

  return {
    latitude: latitude,
    longitude: longitude,
    clientIp: clientIp,
    loc: loc,
    ip: ip,
  };
};

export { getLocationService };
