export type TemplateVarsType = {
  [key: string]: TemplateVarsType | string | number;
};

export interface SendMailInterface {
  subject: string;
  emails: string[];
  htmlTemplate?: string;
  textTemplate?: string;
  templateVars?: TemplateVarsType;
}
