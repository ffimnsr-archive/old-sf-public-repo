import m from "mithril";
import { Auth } from "../../auth";

import adminDashboard from "./dashboard";
import adminViewLog from "./view_log";
import adminViewWalletConfiguration from "./view_wallet_configuration";
import adminViewCountryList from "./view_country_list";
import adminViewCompanyRevenueList from "./view_company_revenue_list";
import adminViewCreditRateList from "./view_credit_rate_list";
import adminViewLoanPurposeList from "./view_loan_purposes";
import adminViewFrequentlyAskQuestions from "./view_frequently_ask_questions";
import adminViewInvestmentList from "./view_investment_list";
import adminViewCollectionList from "./view_collection_list";
import adminViewMemberAccount from "./view_m_account";
import adminViewMemberBorrowerAccount from "./view_m_b_account";
import adminViewMemberPowerAccount from "./view_m_p_account";
import adminViewMemberStatus from "./view_m_status";
import adminViewMemberPowerStatus from "./view_m_p_status";
import adminViewMemberLog from "./view_m_log";
import adminViewMemberWallet from "./view_m_log";
import adminViewDebtorList from "./view_debtor_list";

import adminLoans from "./loans";
import adminInvestors from "./investors";
import adminBorrowers from "./borrowers";
import adminPowerUsers from "./power_users";
import adminInquiries from "./inquiries";
import adminNewCountry from "./new_country";
import adminNewCreditRate from "./new_credit_rate";
import adminNewMember from "./new_member";
import adminNewPowerUser from "./new_power_user";
import adminNewCompanyRevenue from "./new_company_revenue";
import adminNewLoanPurpose from "./new_loan_purpose";
import adminNewFrequentlyAskQuestion from "./new_frequently_ask_question";

export default {
    "/admin/dashboard": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminDashboard;
                else m.route.set("/");
            }
        }
    },
    "/admin/investments": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewInvestmentList;
                else m.route.set("/");
            }
        }
    },
    "/admin/debtors": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewDebtorList;
                else m.route.set("/");
            }
        }
    },
    "/admin/collections": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewCollectionList;
                else m.route.set("/");
            }
        }
    },
    "/admin/loans": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminLoans;
                else m.route.set("/");
            }
        }
    },
    "/admin/new-account": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminNewMember;
                else m.route.set("/");
            }
        }
    },
    "/admin/new-power-user": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminNewPowerUser;
                else m.route.set("/");
            }
        }
    },
    "/admin/power-users": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminPowerUsers;
                else m.route.set("/");
            }
        }
    },
    "/admin/data-analytics": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewLog;
                else m.route.set("/");
            }
        }
    },
    "/admin/inquiries/:type": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminInquiries;
                else m.route.set("/");
            }
        }
    },
    "/admin/wallet-configurations": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewWalletConfiguration;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-log": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewLog;
                else m.route.set("/");
            }
        }
    },
    "/admin/new-country": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminNewCountry;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-country-list": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewCountryList;
                else m.route.set("/");
            }
        }
    },
    "/admin/new-loan-purpose": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminNewLoanPurpose;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-loan-purpose-list": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewLoanPurposeList;
                else m.route.set("/");
            }
        }
    },
    "/admin/new-company-revenue": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminNewCompanyRevenue;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-company-revenue-list": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewCompanyRevenueList;
                else m.route.set("/");
            }
        }
    },
    "/admin/new-credit-rate": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminNewCreditRate;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-credit-rate-list": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewCreditRateList;
                else m.route.set("/");
            }
        }
    },
    "/admin/new-frequently-ask-question": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminNewFrequentlyAskQuestion;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-frequently-ask-questions": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewFrequentlyAskQuestions;
                else m.route.set("/");
            }
        }
    },
    "/admin/investors/:key": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminInvestors;
                else m.route.set("/");
            }
        }
    },
    "/admin/borrowers/:key": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminBorrowers;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-m-account/:id": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewMemberAccount;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-m-b-account/:id": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewMemberBorrowerAccount;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-m-p-account/:id": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewMemberPowerAccount;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-m-status/:id": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewMemberStatus;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-m-p-status/:id": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewMemberPowerStatus;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-m-logs/:id": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewMemberLog;
                else m.route.set("/");
            }
        }
    },
    "/admin/view-m-wallet/:id": {
        onmatch: function() {
            if (Auth.checkTokenNone()) m.route.set("/login");
            else {
                if (Auth.checkIsRoleAdmin()) return adminViewMemberWallet;
                else m.route.set("/");
            }
        }
    },
};
