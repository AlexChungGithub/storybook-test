class ApiUtils {
  static async getUserPermission(token: string) {
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const requestBody = {
        query: `query getUserPermission {
                me {
                  permissionKeys
                }
              }`
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.me.permissionKeys;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return [];
    }
  }

  static async getTemplate(templateId: string) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `query GetTemplate($templateId: String!) {
          template(id: $templateId) {
            id
            name
            describe
            language
            member
            schema
          }
        }`,
        variables: { templateId }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.template;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return {};
    }
  }

  static async getTemplateList(start?: number, limit?: number) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `query getTempalteList($start: Int, $limit: Int) {
          templateList(start: $start, limit: $limit) {
            data {
              id
              describe
              language
              member
              name
              schema
            }
            total
          }
        }`,
        variables: { start, limit }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.templateList.data;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return [];
    }
  }

  static async getFormList(filter?: object, start?: number, limit?: number) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `query getFormList($filter: FormFilter) {
          formList(filter: $filter) {
            total
            data {
              id
              describe
              type
              name
              status
              modifyTime
              template {
                id
                schema
              }
              afterSubmission {
                id
                spec
                type
                name
              }
              closePublisher {
                id
                type
                name
                spec
              }
              integration {
                id
                type
                name
                spec
              }
              publishTime
            }
          }
        }`,
        variables: { filter: filter, start: start, limit: limit }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.formList.data;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return [];
    }
  }

  static async craeteForm(
    token: string,
    input: { describe: string; name: string; templateId: string; type?: string }
  ) {
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const requestBody = {
        query: `mutation CreateForm($input: CreateFormInput!) {
          createForm(input: $input) {
            id
            describe
            type
            name
            status
            publishTime
            closeTime
            createTime
            modifyTime
          }
        }`,
        variables: { input: input }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.createForm;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return null;
    }
  }

  static async getFormDataList(
    filter?: object,
    start?: number,
    limit?: number
  ) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `query getFormDataList($filter: FormDataFilter, $start: Int, $limit: Int) {
          formDataList(filter: $filter, start: $start, limit: $limit) {
            data {
              id
              isValid
              validTime
              data
              createTime
              barcode
              signer {
                id
                name
              }
              form {
                id
                name
              }
              validUser {
                id
                name
              }
            }
            total
          }
        }`,
        variables: { filter: filter, start: start, limit: limit }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.formDataList.data;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return null;
    }
  }
  static async submitFormData(input: {
    data: Record<string, any>;
    formId: string;
  }) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `mutation SumbitFormData($input: SubmitFormDataInput!) {
          sumbitFormData(input: $input) {
            id
            barcode
            data
          }
        }`,
        variables: { input: input }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING SUBMIT FORM DATA", err);
      return null;
    }
  }
  static async getFormEntity(formId: string) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `query Form($formId: String!) {
          form(id: $formId) {
            id
            name
            template{
              schema
            }
          }
        }`,
        variables: { formId: formId }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.form;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH FORM ENTITY", err);
      return null;
    }
  }
  static async getFormData(dataId?: string, barcode?: string) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `query getFormData($formDataId: ID, $barcode: String) {
          formData(id: $formDataId, barcode: $barcode) {
            data
            isValid
            id
            validTime
            createTime
            barcode
            validUser {
              id
              name
              email
              image
              emailVerified
              permissionKeys
              roles {
                id
                displayName
              }
            }
            signer {
              id
              name
              email
              permissionKeys
              emailVerified
            }
          }
        }`,
        variables: { formDataId: dataId, barcode: barcode }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.formData;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH FORM ENTITY", err);
      return null;
    }
  }

  static async validFormData(barcode: string) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `mutation ValidFormData($barcode: String!) {
          validFormData(barcode: $barcode) {
            id
            isValid
            validTime
            data
            createTime
            barcode
            validUser {
              id
              name
            }
          }
        }`,
        variables: { barcode: barcode }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.validFormData;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH FORM ENTITY", err);
      return null;
    }
  }

  static async getDailyDataCount(
    formId: string,
    startTime?: string,
    endTime?: string
  ) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `query GetDailyDataCount($formId: ID!, $stime: String, $etime: String) {
          dailyDataCount(formId: $formId, stime: $stime, etime: $etime) {
            daily {
              count
              date
            }
          }
        }`,
        variables: { formId: formId, stime: startTime, etime: endTime }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.dailyDataCount.daily;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH FORM ENTITY", err);
      return null;
    }
  }

  static async exportFile(jsonString: string, path?: string) {
    try {
      const headers = {
        "content-type": "application/json"
      };
      const requestBody = {
        query: `mutation exportFile($jsonString: String!, $path: String) {
          writeJsonFile(jsonString: $jsonString, path: $path)
        }`,
        variables: { jsonString, path }
      };
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody)
      };
      const response = await fetch("/api/graphql ", options);
      if (response.ok) return (await response.json()).data.exportFile;
      else {
        console.log(await response.json());
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log("ERROR DURING FETCH FORM ENTITY", err);
      return null;
    }
  }
}

export default ApiUtils;
