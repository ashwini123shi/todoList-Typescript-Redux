// Import the endpoints.
import { userListUrl, mockablePostUrl, mockablePutUrl, mockableDeleteUrl } from '../../../Configurations/config_url';
// Import the axios Method.
import { getAPICall, postAPICall, putAPICall, deleteAPICall } from '../AxiosMethodCalls';

// Axios Get Call - Get all jokes categories.
export const getUserListData = async () => {
    try {
        const response = await getAPICall(userListUrl);
        return response.data.data;
    }
    catch (error) {
        return error.response;
    }
}

// Axios Post Call - MockablePost.
export const mockablePostData = async (posted_data) => {
    try {
        const response = await postAPICall('mockablePostUrl', posted_data);
        console.log('👉 Returned data:', response);
    }
    catch (error) {
        console.log(`😱 Axios request failed: ${error}`);
    }
}

// Axios Put Call - MockablePut.
export const mockablePutData = async (posted_data) => {
    try {
        const response = await putAPICall('mockablePostUrl', posted_data);
        console.log('👉 Returned data:', response.data);
    }
    catch (error) {
        console.log(`😱 Axios request failed: ${error}`);
    }
}

// Axios Delete Call - MockableDelete.
export const mockableDeleteData = async () => {
    try {
        const response = await deleteAPICall('mockablePostUrl');
        console.log('👉 Returned data:', response.data);
    }
    catch (error) {
        console.log(`😱 Axios request failed: ${error}`);
    }
}