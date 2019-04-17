using MyCompanyName.AbpZeroTemplate.ImageApp.Dto;
using MyCompanyName.AbpZeroTemplate.IRepositories;
using MyCompanyName.AbpZeroTemplate.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.ImageApp
{
    public class ImageAppService : AbpZeroTemplateAppServiceBase, IImageAppService
    {
        private readonly IImageRepository _imageRepository;
        public ImageAppService(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }
        //插入图片并返回ID
        public int CreateImageAndReturnID(CreateImageInput input)
        {
            var result = _imageRepository.InsertAndGetId(new Image()
            {
                Data = input.Data
            });
            return result;
        } 
    }
}
