import { Queue, Worker, type Job } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import { sendEmail } from "../config/mail.js";

export const emailQueueName = "emailQueue";

interface EmailJobDataType {
  to:string;
  subject:string;
  body:string;
}


export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

//* Worker

export const queuWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data:EmailJobDataType = job.data;
    await sendEmail(data.to , data.subject , data.body)
  },
  {
    connection: redisConnection,
  }
);
