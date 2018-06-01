import passport from "passport";
import passportLocal from "passport-local";
import mongoose from "mongoose";
import _ from "lodash";

import { default as User } from "../models/user";

const LocalStrategy = passportLocal.Strategy;

