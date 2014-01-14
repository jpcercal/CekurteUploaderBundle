<?php

namespace Cekurte\UploaderBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="cekurte_ajax_liipimagine_uploader")
     * @Method("GET")
     */
    public function uploaderAction(Request $request)
    {
        $filename   = $request->query->get('filename');
        $mapping    = $request->query->get('mapping');
        $filter     = $request->query->get('filter');

        $cacheManager = $this->container->get('liip_imagine.cache.manager');

        return new JsonResponse(array(
            'url' => $cacheManager->getBrowserPath(
                sprintf('uploads/%s/%s', $mapping, $filename),
                $filter
            )
        ));
    }
}
