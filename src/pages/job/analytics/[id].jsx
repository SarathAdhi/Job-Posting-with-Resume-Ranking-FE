import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../../common/layouts/PageLayout";
import axios from "../../../lib/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const JobAnalyticsPage = () => {
  const router = useRouter();

  const jobId = router.query.id;

  const [jobPostsDetails, setJobPostsDetails] = useState(null);
  const [JobPostCandidates, setJobPostCandidates] = useState([]);

  function compare(a, b) {
    if (a.score < b.score) {
      return -1;
    }
    if (a.score > b.score) {
      return 1;
    }
    return 0;
  }

  async function fetchJobPosts() {
    const res = await axios.get(`/jobs/analytics/${jobId}`);

    console.log({ res });

    setJobPostsDetails(res);

    setJobPostCandidates(res.candidates.sort(compare));
  }

  useEffect(() => {
    if (jobId) fetchJobPosts();
  }, [jobId]);

  console.log({ jobPostsDetails, JobPostCandidates });

  return (
    <PageLayout className="grid gap-5">
      <h2>Applied Candidates</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {JobPostCandidates.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
};

export default JobAnalyticsPage;
