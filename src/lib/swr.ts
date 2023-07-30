import useSWR from 'swr';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

const fetcher = async (url: string, token: string) => {
    const res = await api.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export function SWR(url: string, token: string, showError = true) {
    const { data, error, isLoading } = useSWR(
        [url, token],
        ([url, token]) => fetcher(url, token),
        { refreshInterval: 1000 }
    );

    if (error && showError) {
        if (error?.response?.data?.message) {
            //console.log(error.response.data.message);
        } else {
            //console.log(error.message);
        }
    }

    return { data, isLoading };
}