import { jest } from "@jest/globals";
import { sendEmailNotification } from "../utils/emailNotification.js";

describe("sendEmailNotification", () => {
  const originalToken = process.env.FORMSUBMIT_TOKEN;

  afterEach(() => {
    jest.restoreAllMocks();
    if (originalToken === undefined) {
      delete process.env.FORMSUBMIT_TOKEN;
    } else {
      process.env.FORMSUBMIT_TOKEN = originalToken;
    }
  });

  test("sends a server-side notification and confirms provider success", async () => {
    process.env.FORMSUBMIT_TOKEN = "test-token";
    const fetch = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: "true", message: "Sent" }),
    });

    const result = await sendEmailNotification({
      subject: "New RFQ",
      replyTo: "buyer@example.com",
      reference: "EE-RFQ-1234",
      data: { customer: "Test customer" },
    });

    expect(result).toEqual({ success: true, message: "Sent" });
    expect(fetch).toHaveBeenCalledWith(
      "https://formsubmit.co/ajax/test-token",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Accept: "application/json" }),
      })
    );
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
      _subject: "New RFQ",
      _replyto: "buyer@example.com",
      customer: "Test customer",
    });
  });

  test("returns an explicit failure when the provider is unreachable", async () => {
    process.env.FORMSUBMIT_TOKEN = "test-token";
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("network unavailable"));
    const logError = jest.spyOn(console, "error").mockImplementation(() => {});

    await expect(sendEmailNotification({ subject: "New RFQ" })).resolves.toEqual({
      success: false,
      message: "Email provider could not be reached.",
    });
    expect(logError).toHaveBeenCalled();
  });

  test("reports missing backend configuration without making a request", async () => {
    delete process.env.FORMSUBMIT_TOKEN;
    const fetch = jest.spyOn(global, "fetch");

    await expect(sendEmailNotification({ subject: "New RFQ" })).resolves.toEqual({
      success: false,
      message: "Email delivery is not configured on the backend.",
    });
    expect(fetch).not.toHaveBeenCalled();
  });
});
