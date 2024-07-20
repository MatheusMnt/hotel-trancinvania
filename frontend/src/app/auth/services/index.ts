import apiService from "../../../shared/services/api-service";
import { LoginFormInputs } from "../forms/LoginForm";
import { LoginResponse } from "../models/LoginModel";
import { ResetTokenInputs } from "../forms/ResetForm";
import { RecoveryFormInputs } from "../forms/RecoveryForm";
import { RecoveryEmailResponse } from "../models/PasswordModel";
import {
  RegisterClientFormInputs,
  RegisterClientFormInputsWithoutConfirmPassword,
  RegisterHotelierFormInputs,
} from "../forms/RegisterForm";

export async function loginClient({
  username,
  password,
}: LoginFormInputs): Promise<LoginResponse> {
  const response = await apiService.post<LoginResponse>("/auth/client/login", {
    username,
    password,
  });
  localStorage.setItem("accessToken", response.data.token);
  localStorage.setItem("userType", "client");
  localStorage.setItem("userName", username);
  return response.data;
}

export async function resetPasswordClient({
  token,
  newPassword,
}: ResetTokenInputs): Promise<void> {
  await apiService.post("/auth/client/reset-password", {
    token,
    newPassword,
  });
}

export async function sendRecoveryEmailClient({
  email,
}: RecoveryFormInputs): Promise<RecoveryEmailResponse> {
  const response = await apiService.post<RecoveryEmailResponse>(
    "/auth/client/recover-password",
    {
      email,
    }
  );
  return response.data;
}

export async function registerClient(
  data: RegisterClientFormInputsWithoutConfirmPassword
): Promise<void> {
  const response = await apiService.post("/client/create", data);
  console.log(response.data);
  return response.data;
}

export async function registerHotelier(
  data: RegisterHotelierFormInputs
): Promise<void> {
  const response = await apiService.post("/hotelier/create", data);
  console.log(response.data);
  return response.data;
}

export async function loginHotelier({
  username,
  password,
}: LoginFormInputs): Promise<LoginResponse> {
  const response = await apiService.post<LoginResponse>(
    "/auth/hotelier/login",
    {
      username,
      password,
    }
  );
  localStorage.setItem("accessToken", response.data.token);
  localStorage.setItem("userType", "hotelier");
  localStorage.setItem("userName", username);
  return response.data;
}

export async function resetPasswordHotelier({
  token,
  newPassword,
}: ResetTokenInputs): Promise<void> {
  await apiService.post("/auth/hotelier/reset-password", {
    token,
    newPassword,
  });
}

export async function sendRecoveryEmailHotelier({
  email,
}: RecoveryFormInputs): Promise<RecoveryEmailResponse> {
  const response = await apiService.post<RecoveryEmailResponse>(
    "/auth/hotelier/recover-password",
    {
      email,
    }
  );
  return response.data;
}
