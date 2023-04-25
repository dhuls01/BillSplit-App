import { getHeadersWithAuth } from './auth';
import service from './service';

// Get comments
const getComments = async (groupId, expenseId) => {
  const config = {
    method: 'get',
    url: `/groups/${groupId}/expenses/${expenseId}/comments`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { comments },
    } = await service.request(config);

    if (comments) {
      return {
        success: true,
        comments: comments,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Create comment
const createComment = async (groupId, expenseId, body) => {
  const config = {
    method: 'post',
    url: `/groups/${groupId}/expenses/${expenseId}/comments`,
    headers: getHeadersWithAuth(),
    data: body,
  };
  try {
    const {
      data: { createdComment },
    } = await service.request(config);

    if (createdComment) {
      return {
        success: true,
        createdComment: createdComment,
      };
    }
  } catch (err) {
    return {
      success: false,
      errorMessage: err?.response?.data?.errorMessage,
    };
  }
};

// Delete comment
const deleteComment = async (groupId, expenseId, commentId) => {
  const config = {
    method: 'delete',
    url: `/groups/${groupId}/expenses/${expenseId}/comments/${commentId}`,
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { deletedComment },
    } = await service.request(config);

    if (deletedComment) {
      return {
        deletedComment: deletedComment,
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

export { getComments, createComment, deleteComment };
