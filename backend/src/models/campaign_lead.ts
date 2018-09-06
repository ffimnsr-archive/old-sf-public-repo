import mongoose from "mongoose";

export type CampaignLeadModel = mongoose.Document & {
    utmSource: string,
    utmMedium: string,
    utmCampaign: string,
    utmTerm: string,
    utmContent: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
};

const CampaignLeadSchema = new mongoose.Schema({
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    utmTerm: String,
    utmContent: String,
    email: String,
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

const CampaignLead: mongoose.Model<CampaignLeadModel> = mongoose.model<CampaignLeadModel>("CampaignLead", CampaignLeadSchema, "campaign_leads");
export default CampaignLead;
