import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export const sendSecretMail = (adress, secret) => {
  nodemailerMailgun.sendMail(
    {
      from: "Project@seows.com",
      to: adress,
      subject: `우석SNS 가입 인증 메일입니다.`,
      html: `안녕하세요! 가입인증 메일입니다. <br>${secret}<br>로그인 하기 위해 위 단어를 앱/웹사이트에 복사해 붙여넣어주세요!`
    },
    err => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`전송 완료!`);
      }
    }
  );
};
