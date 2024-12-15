const {
  getDailyTransactionReports,
  getWeeklyTransactionReports,
  getMonthlyTransactionReports,
  getCustomTransactionReports,
} = require("../services/reportService");

const getReportsController = async (req, res, next) => {
  try {
    const { type, startDate, endDate } = req.query;
    const { idOrganization } = req.credentials;
    let report;

    switch (type) {
      case "daily":
        report = await getDailyTransactionReports(idOrganization);
        break;
      case "weekly":
        report = await getWeeklyTransactionReports(idOrganization);
        break;
      case "monthly":
        report = await getMonthlyTransactionReports(idOrganization);
        break;
      case "custom":
        report = await getCustomTransactionReports(
          idOrganization,
          startDate,
          endDate
        );
        break;

      default:
        throw new Error("Pick a period");
    }

    res.status(200).json({
      status: "success",
      data: {
        report,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getReportsController };
