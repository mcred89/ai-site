
# Deploy or update the site

```bash
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
pip uninstall tensorboard
pip uninstall keras-applications
rm -rf venv/Libs/site-packages/tensorflow/contrib/
zappa deploy prod
```

## Update site

> zappa update prod

### Deploy under your [Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/getting-started.html) domain and [ACM](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) cert

Update these lines in zappa_settings.json:
> "domain": "themcilroy.com",
> "certificate_arn": "arn:aws:acm:us-east-1:824269988929:certificate/a029b88f-a7f8-40a4-bd09-3a49787d4c73"

Deploy your cert (this takes awhile to propigate):
> zappa certify

Tear it all down with:
> zappa undeploy

## Notes

- Deploy package is too large. Created layers. Am getting a WGSI error.
- Models and layers (layers in seperate repo) are manually deployed.
- Will likley need to switch to serverless + layers.