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
    let reports;

    switch (type) {
      case "daily":
        reports = await getDailyTransactionReports(idOrganization);
        break;
      case "weekly":
        reports = await getWeeklyTransactionReports(idOrganization);
        break;
      case "monthly":
        reports = await getMonthlyTransactionReports(idOrganization);
        break;
      case "custom":
        reports = await getCustomTransactionReports(
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
        reports,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getReportsController };
