/* DuckMath engine - pure functions, no DOM. Honest backyard duck math.
   Constants stated in the UI: three ducks minimum, 4 sq ft coop and 10 sq ft
   run each, 0.4 lb of layer feed per duck per day, realistic lay at 80% of the
   hatchery claim, 0.25 gal of drinking water per duck per day plus pool dumps. */
var DuckMath = (function () {
  function spaceSqft(ducks) {
    return { coop: 4 * ducks, run: 10 * ducks };
  }
  function flockVerdict(ducks) {
    if (ducks < 3) return 'Three ducks minimum - a pair gets lonely when one is busy, and one duck alone is a sad, loud mistake.';
    if (ducks <= 6) return 'Three to six is the sweet backyard flock - enough chatter, manageable mess.';
    return 'A serious flock - the eggs will outpace the neighbors, plan the giving-away route now.';
  }
  function feedLbDay(ducks, lbPerDuck) {
    return ducks * lbPerDuck;
  }
  function bagDays(bagLb, ducks, lbPerDuck) {
    return bagLb / feedLbDay(ducks, lbPerDuck);
  }
  function eggsPerDay(ducks, claimedPerYear) {
    return ducks * claimedPerYear * 0.8 / 365;
  }
  function eggVerdict(breed) {
    if (breed === 'campbell') return 'Khaki Campbell: the 300-a-year claim, 240 honest eggs - the laying champion that looks like a mallard.';
    if (breed === 'runner') return 'Indian Runner: 250 claimed, 200 honest - eggs from a bird that walks like a wine bottle.';
    if (breed === 'pekin') return 'Pekin: 200 claimed, 160 honest - bigger bird, bigger eggs, bigger appetite.';
    return 'Muscovy: 180 claimed, 145 honest - the quiet one, and technically not even a true duck.';
  }
  function waterGalDay(ducks) {
    return ducks * 0.25;
  }
  function waterVerdict(poolGal, ducks) {
    var per = poolGal / ducks;
    if (per >= 15) return 'Roomy pool - it will still be a brown soup by tomorrow evening, because ducks.';
    if (per >= 8) return 'Standard kiddie-pool math - dump and refill daily, hose the slime twice a week.';
    return 'Too small - ducks filter-feed in their own water; under 8 gal each is a daily health problem, not a pond.';
  }
  function costPerDozen(bagCost, bagLb, ducks, claimedPerYear) {
    var dailyFeed = feedLbDay(ducks, 0.4) * (bagCost / bagLb);
    var epd = eggsPerDay(ducks, claimedPerYear);
    return epd > 0 ? dailyFeed / epd * 12 : 0;
  }
  function costVerdict(perDozen) {
    if (perDozen <= 4) return 'Cheaper than store eggs - duck eggs at grocery-store prices, before you price the pond liner.';
    if (perDozen <= 7) return 'About farmers-market price - fair value for eggs that make pastry famous.';
    return 'Premium territory - these are hobby eggs with a delicious dividend, not an egg economy.';
  }
  return {
    spaceSqft: spaceSqft, flockVerdict: flockVerdict, feedLbDay: feedLbDay, bagDays: bagDays,
    eggsPerDay: eggsPerDay, eggVerdict: eggVerdict, waterGalDay: waterGalDay, waterVerdict: waterVerdict,
    costPerDozen: costPerDozen, costVerdict: costVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = DuckMath;
