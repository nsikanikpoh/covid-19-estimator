const percentageEstimator = (percent, estimate) => (percent / parseFloat(100)) * estimate;

const powerEstimate = (totalNumberOfDays) => 2 ** (totalNumberOfDays / 3);

const currentlyInfectedCalc = (num, casesN) => num * casesN;

const numberOfDays = (periodType) => {
  switch (periodType) {
    case 'days':
      return 1;
    case 'weeks':
      return 7;
    case 'months':
      return 30;
    default:
      return 0;
  }
};

const covid19ImpactEstimator = (data) => {
  const input = data;

  //  Challenge 1
  const impactCurentlyInfected = currentlyInfectedCalc(10, input.reportedCases);
  const severeImpactCurentlyInfected = currentlyInfectedCalc(50, input.reportedCases);
  const days = numberOfDays(input.periodType) * input.timeToElapse;
  const impactEstimate = impactCurentlyInfected * powerEstimate(days);
  const severeImpactEstimate = severeImpactCurentlyInfected * powerEstimate(days);

  //  Challenge 2
  const impactSevereCasesByRequestedTime = percentageEstimator(15, impactEstimate);
  const severeImpactSevereCasesByRequestedTime = percentageEstimator(15, severeImpactEstimate);
  const bedAvailabitlity = percentageEstimator(35, input.totalHospitalBeds);
  const impactHospitalBeds = parseInt(bedAvailabitlity) - impactSevereCasesByRequestedTime;
  const severeImpactHospitalBeds = (parseInt(bedAvailabitlity)
                                          - severeImpactSevereCasesByRequestedTime);

  //  Challenge 3
  const impactCasesForICUByRequestedTime = percentageEstimator(5, impactEstimate);
  const severeImpactCasesForICUByRequestedTime = percentageEstimator(5, severeImpactEstimate);
  const impactCasesForVentilators = percentageEstimator(2, impactEstimate);
  const severeImpactCasesForVentilators = percentageEstimator(2, severeImpactEstimate);
  const impactDollarsInFlight = (impactEstimate * input.region.avgDailyIncomeInUSD
                                    * input.region.avgDailyIncomePopulation * days);
  const severeImpactDollarsInFlight = (severeImpactEstimate * input.region.avgDailyIncomeInUSD
                                          * input.region.avgDailyIncomePopulation * days);

  return ({
    data: input,
    impact: {
      currentlyInfected: impactCurentlyInfected,
      infectionsByRequestedTime: impactEstimate,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBeds,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilators,
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactCurentlyInfected,
      infectionsByRequestedTime: severeImpactEstimate,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBeds,
      casesForICUByRequestedTime: severeImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactCasesForVentilators,
      dollarsInFlight: severeImpactDollarsInFlight
    }
  });
};

export default covid19ImpactEstimator;
