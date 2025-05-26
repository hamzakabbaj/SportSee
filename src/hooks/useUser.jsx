import {
  getUser,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from "@/api/userAPI";
import { useState, useEffect } from "react";

export const useUser = (id) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser(id)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  return { user, isLoading, error };
};

export const useUserActivity = (id) => {
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserActivity(id)
      .then((data) => {
        setActivity(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  return { activity, isLoading, error };
};

export const useUserAverageSessions = (id) => {
  const [averageSessions, setAverageSessions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserAverageSessions(id)
      .then((data) => {
        setAverageSessions(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  return { averageSessions, isLoading, error };
};

export const useUserPerformance = (id) => {
  const [performance, setPerformance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserPerformance(id)
      .then((data) => {
        setPerformance(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  return { performance, isLoading, error };
};
