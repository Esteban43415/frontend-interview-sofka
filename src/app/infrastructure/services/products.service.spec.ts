import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { ToastService } from '../toast.service';
import { Api } from '@utils/api-routes';

class MockToastService {
  show(message: string, type: string) {}
}

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ToastService, useClass: MockToastService }
      ]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todos los productos', async () => {
    const mockResponse = { data: [{ id: '1' }] };
    const promise = service.getAllProducts();
    const req = httpMock.expectOne(Api.products);
    req.flush(mockResponse);
    const result = await promise;
    expect(result).toEqual(mockResponse);
  });

  it('debería manejar error al obtener todos los productos', async () => {
    const promise = service.getAllProducts();
    const req = httpMock.expectOne(Api.products);
    req.error(new ErrorEvent('Network error'));
    const result = await promise;
    expect(result).toBeNull();
  });

  it('debería obtener producto por id y mostrar toast', async () => {
    spyOn(toastService, 'show');
    const mockResponse = { id: '1' };
    const promise = service.getProductById('1');
    const req = httpMock.expectOne(Api.productsById('1'));
    req.flush(mockResponse);
    const result = await promise;
    expect(result).toEqual(mockResponse);
    expect(toastService.show).toHaveBeenCalledWith('Producto obtenido con éxito', 'success');
  });

  it('debería manejar error al obtener producto por id', async () => {
    spyOn(toastService, 'show');
    const promise = service.getProductById('1');
    const req = httpMock.expectOne(Api.productsById('1'));
    req.error(new ErrorEvent('Network error'));
    const result = await promise;
    expect(result).toBeNull();
    expect(toastService.show).toHaveBeenCalledWith('Error al obtener producto', 'error');
  });

  it('debería verificar producto', async () => {
    const mockResponse = true;
    const promise = service.verifyProduct('1');
    const req = httpMock.expectOne(Api.verifyProduct('1'));
    req.flush(mockResponse);
    const result = await promise;
    expect(result).toBeTrue();
  });

  it('debería manejar error al verificar producto', async () => {
    spyOn(toastService, 'show');
    const promise = service.verifyProduct('1');
    const req = httpMock.expectOne(Api.verifyProduct('1'));
    req.error(new ErrorEvent('Network error'));
    const result = await promise;
    expect(result).toBeNull();
    expect(toastService.show).toHaveBeenCalledWith('Error al obtener producto', 'error');
  });

  it('debería agregar producto y mostrar toast', async () => {
    spyOn(toastService, 'show');
    const mockResponse = { message: 'Creado' };
    const promise = service.addProduct({ id: '1' });
    const req = httpMock.expectOne(Api.products);
    req.flush(mockResponse);
    const result = await promise;
    expect(result).toEqual(mockResponse);
    expect(toastService.show).toHaveBeenCalledWith('Creado', 'success');
  });

  it('debería manejar error al agregar producto', async () => {
    spyOn(toastService, 'show');
    const promise = service.addProduct({ id: '1' });
    const req = httpMock.expectOne(Api.products);
    req.error(new ErrorEvent('Network error'));
    const result = await promise;
    expect(result).toBeNull();
    expect(toastService.show).toHaveBeenCalledWith('Error al crear producto', 'error');
  });

  it('debería actualizar producto y mostrar toast', async () => {
    spyOn(toastService, 'show');
    const mockResponse = { message: 'Actualizado' };
    const promise = service.updateProduct('1', { id: '1' });
    const req = httpMock.expectOne(Api.productsById('1'));
    req.flush(mockResponse);
    const result = await promise;
    expect(result).toEqual(mockResponse);
    expect(toastService.show).toHaveBeenCalledWith('Producto actualizado con éxito', 'success');
  });

  it('debería manejar error al actualizar producto', async () => {
    spyOn(toastService, 'show');
    const promise = service.updateProduct('1', { id: '1' });
    const req = httpMock.expectOne(Api.productsById('1'));
    req.error(new ErrorEvent('Network error'));
    const result = await promise;
    expect(result).toBeNull();
    expect(toastService.show).toHaveBeenCalledWith('Error al actualizar producto', 'error');
  });

  it('debería eliminar producto y mostrar toast', async () => {
    spyOn(toastService, 'show');
    const mockResponse = { message: 'Eliminado' };
    const promise = service.deleteProduct('1');
    const req = httpMock.expectOne(Api.productsById('1'));
    req.flush(mockResponse);
    const result = await promise;
    expect(result).toEqual(mockResponse);
    expect(toastService.show).toHaveBeenCalledWith('Producto eliminado con éxito', 'success');
  });

  it('debería manejar error al eliminar producto', async () => {
    spyOn(toastService, 'show');
    const promise = service.deleteProduct('1');
    const req = httpMock.expectOne(Api.productsById('1'));
    req.error(new ErrorEvent('Network error'));
    const result = await promise;
    expect(result).toBeNull();
    expect(toastService.show).toHaveBeenCalledWith('Error eliminando producto', 'error');
  });
});
