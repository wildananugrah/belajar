const AppTable = ({ headers, items }: { headers: any[]; items: any[] }) => {
  return (
    <div className="overflow-x-auto relative border sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((header: any, index: number) => {
              return (
                <th key={index} scope="col" className="py-3 px-6">
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.length > 0 &&
            items.map((item: any, itemIndex: number) => {
              return (
                <tr key={itemIndex} className="bg-white border-b">
                  {headers.map((header: any, index: number) => {
                    if (header.action !== undefined)
                      return (
                        <td key={index} scope="col" className="py-3 px-6">
                          {header.action(item, itemIndex)}
                        </td>
                      );
                    return (
                      <td key={index} scope="col" className="py-3 px-6">
                        {item[header.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
