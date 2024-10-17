import axios from 'axios';

const SPACE_X_API_URL = 'https://api.spacexdata.com/v5/launches';

const getLaunchesJson = async () => {
    return (await axios.get(SPACE_X_API_URL)).data;
};

export default getLaunchesJson;