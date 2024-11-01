import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ICart } from '../../../domain/entities/cart.entity';
import CartRepository, {
  ACTIONS,
} from '../../../domain/repositories/cart.repository';

export default class CartHttpAdapter implements CartRepository {
  url: string;
  axiosService: AxiosInstance;
  constructor(url: string, axiosService: AxiosInstance) {
    this.url = url;
    this.axiosService = axiosService;
  }

  async getCart(token: string | null): Promise<ICart> {
    try {
      // const headers = {
      //   Authorization: token ? `Bearer ${token}` : '', // If token exists, send it; otherwise, send an empty string or omit the header.
      // };
      // const response = await this.axiosService.get(`${this.url}`, {
      //   headers,
      // });
      // return response.data;

      const request = {
        method: 'get',
        url: `${this.url}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      console.log(request);

      const response = await this.makeRequest(request);
      return response.data;
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        throw new Error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error('Network error: No response received from server');
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
  }
  async addProductToCart(
    productId: string,
    quantity: number,
    token: string | null
  ): Promise<void> {
    try {
      const headers = {
        Authorization: token ? `Bearer ${token}` : '', // If token exists, send it; otherwise, send an empty string or omit the header.
      };

      const body = {
        quantity,
      };

      const response = await this.axiosService.post(
        `${this.url}/${productId}`,
        body,
        {
          headers,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        throw new Error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error('Network error: No response received from server');
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
  }
  async removeFromTheCart(
    productId: string,
    token: string | null
  ): Promise<void> {
    try {
      const headers = {
        Authorization: token ? `Bearer ${token}` : '', // If token exists, send it; otherwise, send an empty string or omit the header.
      };

      const response = await this.axiosService.delete(
        `${this.url}/${productId}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        throw new Error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error('Network error: No response received from server');
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
  }
  async updateProductCart(
    productId: string,
    quantity: number,
    action: ACTIONS,
    token: string | null
  ): Promise<void> {
    try {
      const headers = {
        Authorization: token ? `Bearer ${token}` : '', // If token exists, send it; otherwise, send an empty string or omit the header.
      };

      const body = {
        quantity,
        action,
      };

      console.log('hui');
      console.log(`${this.url}/${productId}`);
      const response = await this.axiosService.patch(
        `${this.url}/${productId}`,
        body,
        {
          headers,
        }
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        throw new Error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error('Network error: No response received from server');
      } else {
        throw new Error(`Error: ${error.message}`);
      }
    }
  }

  async makeRequest(request: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response = await this.axiosService(request);
      if (!(response.status >= 200 && response.status < 300)) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response;
    } catch (error) {
      throw new Error(
        `Failed to process the HTTP request in the CartAdapter\nError message: ${error}`
      );
    }
  }
}
