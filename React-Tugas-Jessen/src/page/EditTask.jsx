import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import http from '../api/apiClient';

export default function EditTask() {
      const params = useParams();
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // State untuk menyimpan data form
    const [form, setForm] = useState({
        title: "",
        due_date: "",
        description: "",
        status: "Pending"
    });
    const fetchtTask = useCallback(async () => {
        try {
            const response = await http.get(`/task/${params.id}`);
            setForm(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [params]);
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        
        setForm({
            ...form,
            [name]: value
        });
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await http.put(`/task/${params.id}`, form);
            if (response.status === 200) {
                navigation("/home", {
                    replace: true,
                });
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchtTask();
    }, [fetchtTask]);
    return (
        <div className='flex justify-center flex-col min-h-screen max-w-screen mx-auto bg-gambar-1'>
            <div className='flex flex-col justify-center flex-1 w-full min-h-screen max-w-md mx-auto'>
                <form onSubmit={onSubmit} className='max-w-md mx-auto mt-10 space-y-6 p-6 border border-gray-200 rounded-lg bg-white'>
                    <h1 className='text-center font-semibold text-2xl mt-10'>Edit Task</h1>
                    {error && (
                        <div className="px-4 py-2.5 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className='space-y-6'>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input type="text" label='title' name="title" value={form.title} onChange={handleOnChange} className='w-full mt-2 p-3 rounded-lg border border-gray-300' />
                        </div>
                        <div>
                            <label htmlFor="dueDate">Due Date</label>
                            <input type="date" label='dueDate' name='due_date' value={form.due_date} onChange={handleOnChange} className='w-full mt-2 p-3 rounded-lg border border-gray-300' />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea label='description' name='description' value={form.description} onChange={handleOnChange} className='w-full mt-2 p-3 rounded-lg border border-gray-300'></textarea>
                        </div>
                        <div>
                            <label htmlFor="status">Status</label>
                            <select id='status' name='status' value={form.status} onChange={handleOnChange} className='w-full mt-2 p-3 rounded-lg border border-gray-300'>
                                <option value="Finished">Finished</option>
                                <option value="On Progress">On Progress</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                        <div>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' type='submit'>Edit Task</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
