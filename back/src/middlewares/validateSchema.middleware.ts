import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";

function validateSchema(schema: Schema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  }

export default validateSchema;