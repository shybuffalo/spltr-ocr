import boto3
import re

if __name__ == "__main__":
    fileName='images/test5.jpg'
    bucket='pigmyswiftcat'

    client=boto3.client('rekognition','us-east-1')

    response = client.detect_text(Image={'S3Object':{'Bucket':bucket,'Name':fileName}})

    print('Detected labels for ' + fileName)
    parentIDs = {}

    for item in response['TextDetections']:
        if item["Type"] == 'LINE':
            line = item['DetectedText']
            match = re.search('[0-9]+\.[0-9]+', line)
            match2 = re.search('total', line, flags=re.IGNORECASE)
            if match and not match2:
                parentIDs[item['Id']] = {'item':[],
                                         'price':0}
                #print (line)
        if item['Type'] == 'WORD':
            pid = item['ParentId']
            if pid in parentIDs:
                word = item["DetectedText"]
                match = re.match('[0-9]+\.[0-9]+', word)
                if match:
                    parentIDs[pid]['price'] = float(match.group(0))
                else:
                    parentIDs[pid]['item'].append(word)
    for pid in parentIDs:
        if not parentIDs[pid]['item']:
            print("Price: {}".format(parentIDs[pid]['price']))
        else:
            print("Item: {0}, Price: {1}".format(' '.join(parentIDs[pid]['item']), parentIDs[pid]['price']))
        #total += parentIDs[pid]['price']
