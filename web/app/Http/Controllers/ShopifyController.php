<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CommandExecute;

class ShopifyController extends Controller
{
    //
    public function test()
    {
        $cmd = "curl --location --request GET '".ENV('SHOPIFY_URL')."products.json' \
        --header 'X-Shopify-Access-Token: ".ENV('SHOPIFY_KEY')."'";
        $command = new CommandExecute();
        $return = $command->exec($cmd)['success'];
        return json_decode($return);
    }


    public function createCollection()
    {
        $fields = array(
            "custom_collection" =>
                [
                    "title" => "Shirts",
                    "collects" => [
                            ["product_id" => 8144954818839]
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

    public function getAllCollection()
    {
       
    }

    public function createPriceRule()
    {
        $fields = array(
            "price_rule" => 
                [
                    "title" => "Buy1Get1Free",
                    "value_type" => "percentage",
                    "value" => "-100.0",
                    "customer_selection" => "all",
                    "target_type" => "line_item",
                    "target_selection" => "entitled",
                    "allocation_method" => "each",
                    "starts_at" => "2023-03-22T00 => 00 => 00-00 => 00",
                    "prerequisite_collection_ids" => [
                        443795996951
                        ],
                    "entitled_product_ids" => [
                        8144954589463
                        ],
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
}
