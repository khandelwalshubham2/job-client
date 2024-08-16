import { useLocation, useNavigate, useParams } from "react-router-dom";
import JobForm from "../common-form/JobForm";
import {
  useCreateJobMutation,
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "@/store/apis/jobApi";
import { z } from "zod";
import { jobFormSchema } from "@/schemas/NewJobForm";
import { toast } from "sonner";

const ManageJob = () => {
  const { state: companyDetails } = useLocation();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [createJob, { isLoading: createJobLoading }] = useCreateJobMutation();
  const [updatejob, { isLoading: updateJobLoading }] = useUpdateJobMutation();
  const { data: jobData } = useGetJobByIdQuery(jobId as string, {
    skip: !jobId,
  });
  const onCreate = async (formData: z.infer<typeof jobFormSchema>) => {
    try {
      await createJob({
        ...formData,
        company: companyDetails.companyId,
      }).unwrap();
      toast.success("Job is successfully created");
      navigate("/jobs-posted");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  const onUpdate = async (formData: z.infer<typeof jobFormSchema>) => {
    try {
      //updating ealier job
      await updatejob({ ...formData, id: jobId }).unwrap();
      //console.log(response);
      toast.success("Job is successfully updated");

      navigate("/jobs-posted");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <JobForm
      companyDetails={companyDetails}
      isUpdate={!!jobId}
      onSave={jobId ? onUpdate : onCreate}
      onSaveLoading={jobId ? updateJobLoading : createJobLoading}
      jobData={jobData}
    />
  );
};

export default ManageJob;
