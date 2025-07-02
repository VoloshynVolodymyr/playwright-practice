import { APIRequestContext } from "@playwright/test";

interface CarData {
  carId: number;
  carBrandId: number;
  brand: string;
  carModelId: number;
  model: string;
  mileage: number;
  createdAt: string;
}

interface CarResponse {
  status: string;
  message?: string;
  data?: CarData;
}

interface CarListData {
  id: number;
  carBrandId: number;
  carModelId: number;
  initialMileage: number;
  updatedMileageAt: string;
  mileage: number;
  brand: string;
  model: string;
  logo: string;
}

interface CarsListResponse {
  status: string;
  data: CarListData[];
}

export default class CarController {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async addNewCar(
    carBrandId: number,
    carModelId: number,
    mileage: number,
    sid: string
  ): Promise<CarResponse> {
    const response = await this.request.post("/api/cars/", {
      data: {
        carBrandId,
        carModelId,
        mileage,
      },
      headers: {
        Cookie: sid,
      },
    });

    return response.json();
  }

  async getAllUserCars(sid: string): Promise<CarsListResponse> {
    const response = await this.request.get("/api/cars", {
      headers: {
        Cookie: sid,
      },
    });
    return response.json();
  }

  async deleteCar(id: number, sid: string): Promise<CarResponse> {
	const carsResponse = await this.getAllUserCars(sid);
    if (!carsResponse.data || !carsResponse.data.some(car => car.id === id)) {
      return {
        status: "error",
        message: `Car with id ${id} not found`
      };
    }
    const response = await this.request.delete(`/api/cars/${id}`, {
      headers: {
        Cookie: sid,
      },
    });
    return response.json();
  }

  async updateCar(
    carId: number,
    carBrandId: number,
    carModelId: number,
    mileage: number,
    sid: string
  ): Promise<CarResponse> {
    const carCreatedAt = new Date().toISOString();
    const response = await this.request.put(`/api/cars/${carId}`, {
      data: {
        carBrandId,
        carModelId,
        carCreatedAt,
        mileage,
      },
      headers: {
        Cookie: sid,
      },
    });
    return response.json();
  }

  async getLastAddedCar(sid: string): Promise<CarListData> {
    let body = await this.getAllUserCars(sid);

    if (!body.data || body.data.length === 0) {
      await this.addNewCar(1, 1, 1, sid);
	  body = await this.getAllUserCars(sid);
	  return body.data[0];
    }

    return body.data[0];
  }
}
