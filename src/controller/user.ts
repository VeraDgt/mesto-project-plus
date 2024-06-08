import { NextFunction, Request, Response } from "express";

export const getUsers = async (req:Request, res:Response, next:NextFunction) => {
  res.send({ message: 'getUser' });
};

export const getUserById = async (req:Request, res:Response, next:NextFunction) => {
  res.send({ message: 'getUserById' });
};

export const createUser = async (req:Request, res:Response, next:NextFunction) => {
  res.send({ message: 'createUser' });
};