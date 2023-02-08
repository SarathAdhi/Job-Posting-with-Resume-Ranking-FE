import { Card, CardActions, CardContent } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../common/layouts/PageLayout";
import axios from "../lib/axios";
import { useStore } from "../utils/store";

const DashBoadPage = () => {
  const { user, companyId } = useStore();
  const [jobPosts, setJobPosts] = useState(null);

  async function fetchJobPosts() {
    const res = await axios.get(`/company/jobs/${companyId}`);

    setJobPosts(res);
  }

  useEffect(() => {
    if (companyId) fetchJobPosts();
  }, [companyId]);

  console.log({ jobPosts });

  if (!jobPosts) return <></>;

  return (
    <PageLayout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {jobPosts.map((job) => (
        <Card key={job._id}>
          <CardContent className="grid gap-4">
            <div>
              <h4 className="font-semibold">{job.title}</h4>
              <h6>
                {job.location} &#183; {job.type} &#183; {job.salary}
              </h6>
            </div>
          </CardContent>

          <CardActions className="p-4">
            <Link href={`/job/analytics/${job._id}`}>View Analytics</Link>
          </CardActions>
        </Card>
      ))}
    </PageLayout>
  );
};

export default DashBoadPage;
