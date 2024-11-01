import { AxiosError, AxiosInstance } from 'axios';
import IProduct from '../../../domain/entities/product.entity';
import ProductRepository from '../../../domain/repositories/product.repository';

export default class ProductHttpAdapter implements ProductRepository {
  url: string;
  axiosService: AxiosInstance;
  constructor(url: string, axiosService: AxiosInstance) {
    this.url = url;
    this.axiosService = axiosService;
  }
  async getProducts(): Promise<IProduct[]> {
    try {
      const response = await this.axiosService.get(`${this.url}`);
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

  async getProduct(productId: string, token: string | null): Promise<IProduct> {
    try {
      const headers = {
        Authorization: token ? `Bearer ${token}` : '', // If token exists, send it; otherwise, send an empty string or omit the header.
      };
      const response = await this.axiosService.get(`${this.url}/${productId}`, {
        headers,
      });
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
}
