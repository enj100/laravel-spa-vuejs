<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
  public function index()
  {
      $products = DB::table('products')->paginate(9);

      return $products;
  }

  public function show($id)
  {
      $product = Product::find($id);
      $response = [
          'product' => $product
      ];

      if($response['product'] == null){
          return response()->json(null,404);
      }

      return response()->json($response, 200);
  }

  public function store(Request $request)
  {
      if(!is_int($request['category_id'])){
          $product = Product::create($request->all());
          return response()->json($product, 201);
      }
      return response()->json(null, 400);
  }

  public function update(Request $request, $id)
  {
      if(!is_int($request['category_id'])){
          $product = Product::findOrFail($id);
          $product->update($request->all());
          return response()->json($product, 200);
      }
      else if(!is_int($request['category_id'])){
          return response()->json(null, 400);
      }
      else if(!is_int($id)){
        return response()->json(null, 404);
      }
  }

  public function delete(Request $request, $id)
  {
      $product = Product::findOrFail($id);
      $product->delete();

      return response()->json(null, 204);
  }
}
