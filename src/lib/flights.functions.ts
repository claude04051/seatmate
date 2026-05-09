import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  airline: z.string().min(2).max(50),
  depIata: z.string().length(3).optional(),
  arrIata: z.string().length(3).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type FlightMatch = {
  flight_number: string;
  airline_name: string;
  airline_iata: string | null;
  dep_iata: string | null;
  dep_airport: string | null;
  dep_time: string | null;
  arr_iata: string | null;
  arr_airport: string | null;
  arr_time: string | null;
  status: string | null;
};

export const searchFlights = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<{ flights: FlightMatch[]; error: string | null }> => {
    const key = process.env.AVIATIONSTACK_API_KEY;
    if (!key) return { flights: [], error: "Flight API not configured" };

    const params = new URLSearchParams({
      access_key: key,
      flight_date: data.date,
      limit: "100",
    });
    // AviationStack lets us filter by airline name/iata and route
    if (data.airline.length === 2) params.set("airline_iata", data.airline.toUpperCase());
    else params.set("airline_name", data.airline);
    if (data.depIata) params.set("dep_iata", data.depIata.toUpperCase());
    if (data.arrIata) params.set("arr_iata", data.arrIata.toUpperCase());

    try {
      const res = await fetch(`https://api.aviationstack.com/v1/flights?${params.toString()}`);
      if (!res.ok) return { flights: [], error: `Flight API error (${res.status})` };
      const json: any = await res.json();
      if (json.error) return { flights: [], error: json.error.message ?? "Flight API error" };

      const flights: FlightMatch[] = (json.data ?? []).map((f: any) => ({
        flight_number: f.flight?.iata ?? f.flight?.icao ?? "",
        airline_name: f.airline?.name ?? "",
        airline_iata: f.airline?.iata ?? null,
        dep_iata: f.departure?.iata ?? null,
        dep_airport: f.departure?.airport ?? null,
        dep_time: f.departure?.scheduled ?? null,
        arr_iata: f.arrival?.iata ?? null,
        arr_airport: f.arrival?.airport ?? null,
        arr_time: f.arrival?.scheduled ?? null,
        status: f.flight_status ?? null,
      })).filter((f: FlightMatch) => f.flight_number);

      return { flights, error: null };
    } catch (e: any) {
      console.error("searchFlights failed", e);
      return { flights: [], error: "Could not reach flight service" };
    }
  });
