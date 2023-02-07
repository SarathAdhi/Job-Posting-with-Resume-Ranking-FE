import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import withAuth from "../../common/hoc/withAuth";
import { PageLayout } from "../../common/layouts/PageLayout";
import axios from "../../lib/axios";

const ViewJobPage = () => {
  const router = useRouter();
  const jobId = router.query.id;

  const [job, setJob] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [similarityObj, setSimilarityObj] = useState({
    score: "",
    isLoading: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function fetchjob() {
    const res = await axios.get(`/jobs/${jobId}`);

    setJob(res);
  }

  useEffect(() => {
    if (jobId) fetchjob();
  }, [jobId]);

  console.log({ job });

  if (!job) return <></>;

  const { company } = job.owner;

  async function checkJobSimilarity() {
    setOpen(false);

    setSimilarityObj({
      ...similarityObj,
      isLoading: true,
    });

    let formData = new FormData();
    formData.append("resume", file);
    formData.append("resumePath", file);
    formData.append("jobId", job._id);

    const res = await axios.post("/job/similarity", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setSimilarityObj({
      score: res.data,
      isLoading: false,
    });
  }

  console.log({ file });

  return (
    <PageLayout className="grid gap-5">
      <div className="flex items-start gap-4">
        <img
          src="https://photos.angel.co/startups/i/8116080-df98e7c7531032300d88dde9e9408aa3-medium_jpg.jpg"
          className="w-20 h-20 rounded-md"
        />

        <div>
          <h2 className="font-semibold">{company.name}</h2>
          <p className="font-semibold text-gray-400">
            {company.size} Employees
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">{job.title}</h4>
        <h6>
          {job.location} &#183; {job.type} &#183; {job.salary}
        </h6>
      </div>

      <div>
        {similarityObj.score ? (
          <p className="text-lg font-semibold">
            Your resume matches about {similarityObj.score} of the job
            description.
          </p>
        ) : (
          <Button onClick={handleClickOpen}>
            Check the Job similarity with your resume
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <h3 className="font-semibold underline">About the company</h3>

          <p className="text-lg whitespace-pre-line">{company?.bio}</p>
        </div>

        <Divider />

        <div className="grid gap-2">
          <h3 className="font-semibold underline">Job Description</h3>

          <p className="text-lg whitespace-pre-line">{job.description}</p>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Upload your Resume to continue
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <input
              type="file"
              name="userfile"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={checkJobSimilarity} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
};

export default withAuth()(ViewJobPage);
