import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {

  // if id is valid mongodb object id  ( every document has unique id assigned a uniqe id )
  // in moviesRoutes.js
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object Of: ${req.params.id}`);
  }
  next();
}

export default checkId;
