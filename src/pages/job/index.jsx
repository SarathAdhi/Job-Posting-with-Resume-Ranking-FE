import { Card, CardActions, CardContent } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import withAuth from "../../common/hoc/withAuth";
import { PageLayout } from "../../common/layouts/PageLayout";
import axios from "../../lib/axios";

const ViewJobsPage = () => {
  const [allJobs, setAllJobs] = useState([]);

  async function fetchAllJobs() {
    const res = await axios.get("/jobs");

    setAllJobs(res);
  }

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <PageLayout className="grid">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allJobs.map((job) => {
          const { company } = job.owner;
          return (
            <Card key={job._id}>
              <CardContent className="grid gap-4">
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
              </CardContent>

              <CardActions className="p-4">
                <Link href={`/job/${job._id}`}>View Job</Link>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </PageLayout>
  );
};

export default withAuth()(ViewJobsPage);
