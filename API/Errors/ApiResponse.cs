using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400=> "You have made a bad request",
                401=> "You are not authorized to view this page",
                404=> "Resource not found",
                500=> "Server side Error",
                _=> null
            };
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}