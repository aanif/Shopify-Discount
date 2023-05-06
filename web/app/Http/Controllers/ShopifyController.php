<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CommandExecute;

class ShopifyController extends Controller
{
    //
    public function getProducts()
    {
        $cmd = "curl --location --request GET '".ENV('SHOPIFY_URL')."products.json' \
        --header 'X-Shopify-Access-Token: ".ENV('SHOPIFY_KEY')."'";
        $command = new CommandExecute();
        $return = $command->exec($cmd)['success'];
        return json_decode($return);
    }


    public function createCollection(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'title' => 'required|max:225'
        ]);

        $fields = array(
            "custom_collection" =>
                [
                    "title" => $request->title,
                    "collects" => [
                            ["product_id" => $request->product_id]
                    ]
                ]
            );
        $cmd = "curl --location '".ENV('SHOPIFY_URL')."custom_collections.json' \
        --header 'X-Shopify-Access-Token: ".ENV('SHOPIFY_KEY')."' \
        --header 'Content-Type: application/json' \
        --data '".json_encode($fields)."'";

        $command = new CommandExecute();
        $return = $command->exec($cmd)['success'];
        return json_decode($return);
    }

    public function getAllPriceRules()
    {
        $cmd = "curl --location '".ENV('SHOPIFY_URL')."price_rules.json' \
        --header 'X-Shopify-Access-Token: ".ENV('SHOPIFY_KEY')."' \
        --header 'Content-Type: application/json'";
        $command = new CommandExecute();
        $return = $command->exec($cmd)['success'];
        return json_decode($return);
    }

    public function getPriceRule($id)
    {
        $cmd = "curl -X GET '".ENV('SHOPIFY_URL')."price_rules/".$id.".json' \
        --header 'X-Shopify-Access-Token: ".ENV('SHOPIFY_KEY')."' \
        --header 'Content-Type: application/json'";
        $command = new CommandExecute();
        $return = $command->exec($cmd)['success'];
        return json_decode($return);
    }

    public function createPriceRule(Request $request)
    {
        $validated = $request->validate([
            'prerequisite_collection_ids' => 'required|array',
            'entitled_product_ids' => 'required|array',
            'title' => 'required|max:225',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date',
        ]);

        $fields = array(
            "price_rule" => 
                [
                    "title" => $request->title,
                    "value_type" => "percentage",
                    "value" => "-100.0",
                    "customer_selection" => "all",
                    "target_type" => "line_item",
                    "target_selection" => "entitled",
                    "allocation_method" => "each",
                    "starts_at" => $request->starts_at,
                    "ends_at" => $request->ends_at,
                    "prerequisite_product_ids" => $request->prerequisite_collection_ids,
                    "entitled_product_ids" => $request->entitled_product_ids,
                    "prerequisite_to_entitlement_quantity_ratio" => [
                        "prerequisite_quantity" => 1,
                        "entitled_quantity" => 1
                    ],
                    "allocation_limit" => 1
                ]
            );
        $cmd = "curl --location '".ENV('SHOPIFY_URL')."price_rules.json' \
        --header 'X-Shopify-Access-Token: ".ENV('SHOPIFY_KEY')."' \
        --header 'Content-Type: application/json' \
        --data '".json_encode($fields)."'";
        $command = new CommandExecute();
        $return = $command->exec($cmd)['success'];
        return json_decode($return);
    }

    public function updatePriceRule(Request $request, $id)
    {
        $validated = $request->validate([
            'prerequisite_collection_ids' => 'array',
            'entitled_product_ids' => 'array',
            'title' => 'max:225',
            'starts_at' => 'date',
        ]);

        foreach($request->all() as $index=>$value){
            $fields['price_rule'][$index] = $value;
         }

        $cmd = "curl -X PUT '".ENV('SHOPIFY_URL')."price_rules/".$id.".json' \
        --header 'X-Shopify-Access-Token: ".ENV('SHOPIFY_KEY')."' \
        --header 'Content-Type: application/json' \
        --data '".json_encode($fields)."'";
        $command = new CommandExecute();
        $return = $command->exec($cmd);
        return json_decode($return['success']);
    }

    public function deletePriceRule($id)
    {
        $cmd = "curl -X DELETE '".ENV('SHOPIFY_URL')."price_rules/".$id.".json' \
        --header 'X-Shopify-Access-Token: ".ENV('SHOPIFY_KEY')."' \
        --header 'Content-Type: application/json'";
        $command = new CommandExecute();
        $return = $command->exec($cmd)['success'];
        return json_decode($return);
    }
}
