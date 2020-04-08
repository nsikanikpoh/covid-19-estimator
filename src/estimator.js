const percentageEstimator = (percent, estimate) => {
  return ((percent/parseFloat(100)) * estimate ));
}

const powerEstimate = (totalNumberOfDays) =>{
  return (Math.pow(2, (totalNumberOfDays/3)));
}

const currentlyInfectedCalc = (num, casesN) => {
  return num * casesN;
}

const numberOfDays = (periodType) => {
  switch (periodType) {
    case "days":
      return 1;
    case "weeks":
      return 7;
    case "months":
     return 30;
    default:
      return 0;
  }
}

const covid19ImpactEstimator = (data) => {
  const input = data;

  //Challenge 1
  const impactCurentlyInfected = currentlyInfectedCalc(10, input.reportedCases);
  const severeImpactCurentlyInfected = currentlyInfectedCalc(50, input.reportedCases);
  const days = numberOfDays(input.periodType) * input.timeToElapse;
  const impactEstimate = impactCurentlyInfected * powerEstimate(days);
  const severeImpactEstimate = severeImpactCurentlyInfected * powerEstimate(days);

  //Challenge 2
  const impactSevereCasesByRequestedTime = percentageEstimator(15, impactEstimate);
  const severeImpactSevereCasesByRequestedTime = percentageEstimator(15, severeImpactEstimate);
  const bedAvailabitlity = percentageEstimator(35, input.totalHospitalBeds);
  const impactHospitalBedsByRequestedTime = parseInt(bedAvailabitlity - impactSevereCasesByRequestedTime);
  const severeImpactHospitalBedsByRequestedTime = parseInt(bedAvailabitlity - severeImpactSevereCasesByRequestedTime);

  //Challenge 3
  const impactCasesForICUByRequestedTime = percentageEstimator(5, impactEstimate);
  const severeImpactCasesForICUByRequestedTime = percentageEstimator(5, severeImpactEstimate);
  const impactCasesForVentilatorsByRequestedTime = percentageEstimator(2, impactEstimate);
  const severeImpactCasesForVentilatorsByRequestedTime = percentageEstimator(2, severeImpactEstimate);
  const impactDollarsInFlight = impactEstimate * input.region.avgDailyIncomeInUSD * input.region.avgDailyIncomePopulation * days;
  const severeImpactDollarsInFlight = severeImpactEstimate * input.region.avgDailyIncomeInUSD * input.region.avgDailyIncomePopulation * days;

  return({
    data: input,
    impact: {
      currentlyInfected: impactCurentlyInfected,
      infectionsByRequestedTime: impactEstimate,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactCurentlyInfected,
      infectionsByRequestedTime: severeImpactEstimate,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: severeImpactDollarsInFlight
    }
  });
}

export default covid19ImpactEstimator;
