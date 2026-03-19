const validateScoreInput = (req, res, next) => {
  const { projectName, pillars } = req.body;

  if (!projectName || projectName.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Project name is required' });
  }

  if (!pillars || !Array.isArray(pillars) || pillars.length === 0) {
    return res.status(400).json({ success: false, error: 'At least one pillar is required' });
  }

  for (const pillar of pillars) {
    if (!pillar.name || pillar.weight === undefined) {
      return res.status(400).json({ success: false, error: 'Each pillar must have a name and weight' });
    }
    if (!pillar.criteria || !Array.isArray(pillar.criteria)) {
      return res.status(400).json({ success: false, error: 'Each pillar must have criteria array' });
    }
  }

  next();
};

module.exports = { validateScoreInput };
