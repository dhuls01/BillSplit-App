import { getHeadersWithAuth } from './auth';
import service from './service';

// Get expenses
const getExpenses = async (groupId) => {
  const config = {
    method: 'get',
    url: `/groups/${groupId}/expenses`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { expenses },
    } = await service.request(config);

    if (expenses) {
      return {
        success: true,
        expenses: expenses,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

const createExpense = async (groupId, body) => {
  const config = {
    method: 'post',
    url: `/groups/${groupId}/expenses`,
    headers: getHeadersWithAuth(),
    data: body,
  };
  try {
    const {
      data: { createdExpense },
    } = await service.request(config);

    if (createdExpense) {
      return {
        success: true,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Get expenses
const getExpenseById = async (groupId, expenseId) => {
  const config = {
    method: 'get',
    url: `/groups/${groupId}/expenses/${expenseId}`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { expense },
    } = await service.request(config);

    if (expense) {
      return {
        success: true,
        expense: expense,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Update expense
const updateExpense = async (groupId, expenseId, body) => {
  const config = {
    method: 'patch',
    url: `/groups/${groupId}/expenses/${expenseId}`,
    headers: getHeadersWithAuth(),
    data: body,
  };
  try {
    const {
      data: { updatedExpense },
    } = await service.request(config);

    if (updatedExpense) {
      return {
        success: true,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Delete expense
const deleteExpense = async (groupId, expenseId) => {
  const config = {
    method: 'delete',
    url: `/groups/${groupId}/expenses/${expenseId}`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { deletedExpense },
    } = await service.request(config);

    if (deletedExpense) {
      return {
        success: true,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

export {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
